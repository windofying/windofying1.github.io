const form = document.getElementById('lead-form');
const submitBtn = document.getElementById('lead-submit');
const formMessage = document.getElementById('lead-form-message');
const successToast = document.getElementById('landing-success-toast');

const SUBMIT_COOLDOWN_MS = 10000;
let submitCooldownUntil = 0;

function setMessage(text, kind) {
  if (!formMessage) return;
  formMessage.textContent = text || '';
  formMessage.hidden = !text;
  formMessage.classList.remove('landing-form-message--success', 'landing-form-message--error');
  if (kind === 'success') formMessage.classList.add('landing-form-message--success');
  if (kind === 'error') formMessage.classList.add('landing-form-message--error');
}

/** Compact English toast — “You have successfully submitted.” */
function showSuccessToast() {
  if (!successToast) return;
  successToast.textContent = 'You have successfully submitted.';
  successToast.hidden = false;
  requestAnimationFrame(() => {
    successToast.classList.add('landing-toast--visible');
  });
  if (successToast._hideTimer) clearTimeout(successToast._hideTimer);
  successToast._hideTimer = setTimeout(() => {
    successToast.classList.remove('landing-toast--visible');
    successToast._hideTimer = setTimeout(() => {
      successToast.hidden = true;
    }, 280);
  }, 4200);
}

function validate({ name, email, phone }) {
  if (!name || !String(name).trim()) {
    return 'Please enter your full name.';
  }
  const em = String(email || '').trim();
  if (!em.includes('@')) {
    return 'Please enter a valid work email.';
  }
  if (!phone || !String(phone).trim()) {
    return 'Please enter your phone number.';
  }
  return null;
}

/**
 * Inserts a single lead row. No select/update/delete calls.
 * Dynamic import keeps Supabase (and esm.sh) off the critical path so filter chips work even if CDN is slow or blocked.
 */
async function insertLead(row) {
  const { getSupabase } = await import('../../lib/supabase.js');
  const supabase = getSupabase();
  const { error } = await supabase.from('leads').insert(row);
  return { error };
}

if (form && submitBtn) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (Date.now() < submitCooldownUntil) {
      setMessage('Please wait before submitting again', 'error');
      return;
    }

    setMessage('');

    const hpFax = form.querySelector('input[name="company_fax"]');
    const hpWebsite = form.querySelector('input[name="website"]');
    if ((hpFax && hpFax.value.trim()) || (hpWebsite && hpWebsite.value.trim())) {
      console.warn('Lead form: honeypot tripped; submission ignored, not sent to Supabase.');
      showSuccessToast();
      return;
    }

    const name = form.querySelector('[name="name"]')?.value?.trim() ?? '';
    const company = form.querySelector('[name="company"]')?.value?.trim() ?? '';
    const email = form.querySelector('[name="email"]')?.value?.trim() ?? '';
    const phone = form.querySelector('[name="phone"]')?.value?.trim() ?? '';
    const capacity = form.querySelector('[name="capacity"]')?.value?.trim() || null;
    const timeline = form.querySelector('[name="timeline"]')?.value?.trim() || null;
    const locationFlex = form.querySelector('[name="location_flexibility"]')?.value?.trim() || null;

    const err = validate({ name, email, phone });
    if (err) {
      setMessage(err, 'error');
      return;
    }

    submitBtn.disabled = true;
    const labelEl = submitBtn.querySelector('.landing-submit-label');
    const busyEl = submitBtn.querySelector('.landing-submit-busy');
    if (labelEl) labelEl.hidden = true;
    if (busyEl) busyEl.hidden = false;

    let reachedNetwork = false;
    try {
      reachedNetwork = true;
      const { error } = await insertLead({
        name,
        company: company || null,
        email,
        phone,
        capacity,
        timeline,
        location_flexibility: locationFlex,
      });

      if (error) {
        console.error('Supabase insert error:', error);
        setMessage('Submission failed, please try again', 'error');
      } else {
        setMessage('');
        form.reset();
        document.querySelectorAll('.landing-chip-group .landing-chip').forEach((c) => {
          c.setAttribute('aria-pressed', 'false');
          c.classList.remove('is-selected');
        });
        showSuccessToast();
      }
    } catch (ex) {
      console.error('Lead submission exception:', ex);
      setMessage('Submission failed, please try again', 'error');
    } finally {
      submitBtn.disabled = false;
      if (labelEl) labelEl.hidden = false;
      if (busyEl) busyEl.hidden = true;
      if (reachedNetwork) {
        submitCooldownUntil = Date.now() + SUBMIT_COOLDOWN_MS;
      }
    }
  });
}
