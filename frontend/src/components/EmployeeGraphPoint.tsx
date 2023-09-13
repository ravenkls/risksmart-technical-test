import { Chart } from "chart.js";

type PointData = {
  name: string;
  type: "company" | "department" | "employee";
};

function EmployeeGraphPoint(context: {
  raw: PointData;
  chart: Chart;
}): HTMLCanvasElement | string {
  const cvs = document.createElement("canvas");
  const ctx = cvs.getContext("2d");

  let radius = 12;
  const canvasCenterX = cvs.width / 2;
  const canvasCenterY = cvs.height / 2;
  if (!ctx) return "";

  if (context.raw.type === "company") {
    radius = 50;
    const image = new Image();
    image.src = "/logo.jpg";

    const drawImage = () => {
      // Save the context state
      ctx.save();

      // Draw the circle and clip it
      ctx.beginPath();
      ctx.arc(canvasCenterX, canvasCenterY, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      // Draw the image centered
      ctx.drawImage(
        image,
        canvasCenterX - radius,
        canvasCenterY - radius,
        radius * 2,
        radius * 2
      );

      // Reset the clipping region
      ctx.restore();
    };

    if (image.complete) {
      drawImage();
    } else {
      image.onload = drawImage;
    }
  } else if (context.raw.type === "department") {
    const fontSize = 16; // Set your desired font size
    const text = context.raw.name; // The text you want to display

    ctx.font = `${fontSize}px Inter`;
    const textMetrics = ctx.measureText(text);

    // Size the canvas to fit the text
    cvs.width = textMetrics.width + 20; // Adding some padding
    cvs.height = fontSize * 2; // Adjust based on your needs

    const canvasCenterX = cvs.width / 2;
    const canvasCenterY = cvs.height / 2;

    // Draw white rectangle
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    // Draw text on top, centered
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `bold ${fontSize}px Inter`;
    ctx.fillText(text, canvasCenterX, canvasCenterY);
  } else if (context.raw.type === "employee") {
    const text = context.raw.name; // The text you want to display
    ctx.font = "12px Inter";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(text, canvasCenterX, canvasCenterY);
  }

  return cvs;
}

export default EmployeeGraphPoint;
