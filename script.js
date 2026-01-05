const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
const progressBar = document.querySelector('.progress-bar');
let currentStep = 0;

var quill = new Quill('#summary-editor', { theme: 'snow' });

nextBtns.forEach(btn => btn.addEventListener('click', () => {
  steps[currentStep].classList.remove('active');
  currentStep++;
  steps[currentStep].classList.add('active');
  updateProgress();
  if(currentStep === steps.length - 1) generateResume();
}));

prevBtns.forEach(btn => btn.addEventListener('click', () => {
  steps[currentStep].classList.remove('active');
  currentStep--;
  steps[currentStep].classList.add('active');
  updateProgress();
}));

function updateProgress() {
  const percent = ((currentStep + 1) / steps.length) * 100;
  progressBar.style.width = percent + '%';
}

function generateResume() {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const linkedin = document.getElementById('linkedin').value;
  const location = document.getElementById('location').value;
  const summary = quill.root.innerHTML;

  document.getElementById('resume-preview').innerHTML = `
    <h2>${name}</h2>
    <p>${phone} | ${email} | ${linkedin} | ${location}</p>
    <h3>Professional Summary</h3>${summary}
  `;
}

function downloadPDF() {
  const element = document.getElementById('resume-preview');
  const opt = { margin: 0.2, filename: 'resume.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, scrollY: 0 }, jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' } };
  html2pdf().set(opt).from(element).save();
}

function downloadWord() {
  const content = document.getElementById('resume-preview').innerHTML;
  const blob = new Blob(['﻿' + content], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'resume.doc';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function calculateATS() {
  const skills = document.getElementById('summary-editor').innerText.toLowerCase().split(/\s+/);
  const jobTitle = document.getElementById('name').value.toLowerCase();

  const keywordBank = {
    'software engineer': ['javascript', 'python', 'api', 'agile', 'react', 'node'],
    'data analyst': ['sql', 'excel', 'python', 'tableau', 'data visualization'],
    'project manager': ['agile', 'scrum', 'leadership', 'risk management', 'communication']
  };

  let keywords = keywordBank[jobTitle] || [];
  let matched = skills.filter(skill => keywords.includes(skill));
  let score = keywords.length > 0 ? Math.round((matched.length / keywords.length) * 100) : 0;

  let suggestions = keywords.filter(k => !matched.includes(k));

  document.getElementById('ats-score').innerHTML = `ATS Score: ${score}%<br>Missing Keywords: ${suggestions.join(', ')}`;
  document.getElementById('ats-suggestions').innerHTML = `Suggested Keywords: ${keywords.join(', ')}`;
}
