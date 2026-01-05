const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
let currentStep = 0;

nextBtns.forEach(btn => btn.addEventListener('click', () => {
  steps[currentStep].classList.remove('active');
  currentStep++;
  steps[currentStep].classList.add('active');
  if(currentStep === steps.length - 1) generateResume();
}));

prevBtns.forEach(btn => btn.addEventListener('click', () => {
  steps[currentStep].classList.remove('active');
  currentStep--;
  steps[currentStep].classList.add('active');
}));

function generateResume() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const linkedin = document.getElementById('linkedin').value;
  const jobTitle = document.getElementById('jobTitle').value;
  const skills = document.getElementById('skills').value;
  const experience = document.getElementById('experience').value;
  const education = document.getElementById('education').value;
  const certificates = document.getElementById('certificates').value;
  const achievements = document.getElementById('achievements').value;

  document.getElementById('resume-preview').innerHTML = `
    <h2>${name}</h2>
    <p>${email} | ${phone} | ${linkedin}</p>
    <h3>${jobTitle}</h3>
    <p><strong>Skills:</strong> ${skills}</p>
    <p><strong>Experience:</strong> ${experience}</p>
    <p><strong>Education:</strong> ${education}</p>
    <p><strong>Certificates:</strong> ${certificates}</p>
    <p><strong>Achievements:</strong> ${achievements}</p>
  `;
}

function downloadPDF() {
  const element = document.getElementById('resume-preview');
  const opt = { margin: 0.5, filename: 'resume.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' } };
  html2pdf().set(opt).from(element).save();
}
