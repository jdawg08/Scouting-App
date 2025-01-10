// Create a list of points
const points = [
    { x: 10, y: 20 },
    { x: 30, y: 40 },
    { x: 50, y: 60 },
  ];
  
  // Get the canvas element
  const canvas = document.querySelector("#myCanvas");
  
  // Get the canvas context
  const ctx = canvas.getContext("2d");
  
  // Start a new path
  ctx.beginPath();
  
  // Loop through the points and draw a line between each pair of points
  for (let i = 0; i < points.length - 1; i++) {
    ctx.moveTo(points[i].x, points[i].y);
    ctx.lineTo(points[i + 1].x, points[i + 1].y);
  }
  
  // Stroke the path to draw the line
  ctx.stroke();