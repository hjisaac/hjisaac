document.addEventListener('DOMContentLoaded', () => {
    initContactGate();
    trackVisit();
});

async function submitToWeb3Forms(payload) {
    const { web3formsAccessKey } = Site.getConfig();

    if (!web3formsAccessKey) {
        throw new Error('missing_access_key');
    }

    const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
            access_key: web3formsAccessKey,
            ...payload,
        }),
    });

    let result = {};
    try {
        result = await response.json();
    } catch {
        throw new Error('invalid_response');
    }

    if (!response.ok || !result.success) {
        throw new Error(result.message || 'submission_failed');
    }

    return result;
}

function initContactGate() {
    const form = document.getElementById('contact-form');
    const gate = document.getElementById('contact-gate');
    const download = document.getElementById('contact-download');
    const status = document.getElementById('contact-form-status');
    const ui = Site.getUi();

    if (!form || !gate || !download) {
        return;
    }

    if (sessionStorage.getItem(Site.STORAGE.CV_UNLOCKED) === 'true') {
        showCvDownload(gate, download);
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        if (!submitButton) {
            return;
        }

        const formData = new FormData(form);
        const name = formData.get('name')?.toString().trim() || ui.formFallbackName;
        const email = formData.get('email')?.toString().trim() || ui.formFallbackEmail;
        const message = formData.get('message')?.toString().trim() || ui.formFallbackMessage;

        submitButton.disabled = true;
        setFormStatus(status, ui.formSending);

        try {
            await submitToWeb3Forms({
                subject: ui.contactSubject,
                from_name: name,
                email,
                message: `${message}\n\n— CV download requested from hjisaac.site`,
            });

            sessionStorage.setItem(Site.STORAGE.CV_UNLOCKED, 'true');
            showCvDownload(gate, download);
        } catch (error) {
            const messageText = error.message === 'missing_access_key'
                ? ui.formMissingKey
                : ui.formError;
            setFormStatus(status, messageText, true);
            submitButton.disabled = false;
        }
    });
}

function showCvDownload(gate, download) {
    gate.hidden = true;
    download.hidden = false;
}

function setFormStatus(element, text, isError = false) {
    if (!element) {
        return;
    }

    element.textContent = text;
    element.classList.toggle('form-status--error', isError);
}

async function trackVisit() {
    const { web3formsAccessKey, trackVisits } = Site.getConfig();
    const ui = Site.getUi();

    if (!web3formsAccessKey || !trackVisits || sessionStorage.getItem(Site.STORAGE.VISIT_TRACKED) === 'true') {
        return;
    }

    try {
        await submitToWeb3Forms({
            subject: ui.visitSubject,
            from_name: 'Site visitor',
            email: ui.visitEmail,
            message: [
                'Someone opened the site.',
                `Page: ${window.location.href}`,
                `Referrer: ${document.referrer || 'direct'}`,
                `Time: ${new Date().toISOString()}`,
            ].join('\n'),
        });

        sessionStorage.setItem(Site.STORAGE.VISIT_TRACKED, 'true');
    } catch {
        // Visit tracking must never block the site.
    }
}
