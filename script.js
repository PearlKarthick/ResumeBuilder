const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
const progressBar = document.querySelector('.progress-bar');
let currentStep = 0;

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
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const linkedin = document.getElementById('linkedin').value;
  const jobTitle = document.getElementById('jobTitle').value;
  const skills = document.getElementById('skills').value;
  const experience = document.getElementById('experience').value;
  const education = document.getElementById('education').value;
  const certificates = document.getElementById('certificates').value;
  const achievements = document.getElementById('achievements').value;
  const summary = document.getElementById('summary').value;
  const projects = document.getElementById('projects').value;
  const languages = document.getElementById('languages').value;
  const references = document.getElementById('references').value;

  document.getElementById('resume-preview').innerHTML = `
    <h2>${name}</h2>
    <p>${email} | ${phone} | ${linkedin}</p>
    <h3>${jobTitle}</h3>
    <p><strong>Summary:</strong> ${summary}</p>
    <p><strong>Skills:</strong> ${skills}</p>
    <p><strong>Experience:</strong> ${experience}</p>
    <p><strong>Education:</strong> ${education}</p>
    <p><strong>Certificates:</strong> ${certificates}</p>
    <p><strong>Achievements:</strong> ${achievements}</p>
    <p><strong>Projects:</strong> ${projects}</p>
    <p><strong>Languages:</strong> ${languages}</p>
    <p><strong>References:</strong> ${references}</p>
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

document.getElementById('toggle-dark').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

function calculateATS() {
  const skills = document.getElementById('skills').value.toLowerCase().split(',');
  const jobTitle = document.getElementById('jobTitle').value.toLowerCase();

  const keywordBank = {
    'software engineer': ['javascript', 'python', 'api', 'agile', 'react', 'node'],
    'data analyst': ['sql', 'excel', 'python', 'tableau', 'data visualization'],
    'project manager': ['agile', 'scrum', 'leadership', 'risk management', 'communication']
  };

  let keywords = keywordBank[jobTitle] || [];
  let matched = skills.filter(skill => keywords.includes(skill.trim()));
  let score = Math.round((matched.length / keywords.length) * 100);

  let suggestions = keywords.filter(k => !matched.includes(k));

  document.getElementById('ats-score').innerHTML = `ATS Score: ${score}%<br>Missing Keywords: ${suggestions.join(', ')}`;
}
