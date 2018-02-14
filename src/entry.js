const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = options.width;
canvas.height = options.height;
ctx.rect(0, 0, canvas.width, canvas.height);   