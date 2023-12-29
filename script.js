function splitText() {
  const inputText = document.getElementById("inputText").value;
  const maxLength = 2200;
  const separator = ".\n\n";

  if (!inputText) {
    alert("الرجاء إدخال نص.");
    return;
  }

  updateTextLength();

  let result = "";
  let remainingText = inputText.replace(/\n/g, "<br>");
  let paragraphNumber = 1;

  while (remainingText.length > 0) {
    let chunk = remainingText.substring(0, maxLength);

    // For subsequent splits, add a dot and a line break
    if (paragraphNumber > 1) {
      chunk += separator;
    }

    if (chunk.length < maxLength) {
      // If the remaining text is shorter than maxLength, use it entirely
      remainingText = "";
    } else {
      const lastSpaceIndex = chunk.lastIndexOf(" ");
      if (lastSpaceIndex !== -1) {
        chunk = chunk.substring(0, lastSpaceIndex);
        remainingText = remainingText.substring(lastSpaceIndex + 1);
      } else {
        remainingText = remainingText.substring(chunk.length);
      }
    }

    const chunkLength = chunk.replace(/<br>/g, "\n").length - separator.length;
    result += `<div class="paragraph"><h2>الفقرة ${paragraphNumber}</h2><div class="paragraph-text">${chunk}</div><div class="length">عدد الأحرف: ${chunkLength}</div><button class="copy-btn" onclick="copyToClipboard(this)">نسخ</button></div>`;
    paragraphNumber++;
  }

  document.getElementById("result").innerHTML = result;
}

// function copyToClipboard(button) {
//   const paragraph = button.parentNode;
//   const textNodes = Array.from(paragraph.childNodes)
//     .filter(node => node.nodeType === Node.TEXT_NODE)
//     .map(node => node.nodeValue)
//     .join('');

//   const tempTextarea = document.createElement('textarea');
//   tempTextarea.value = textNodes;
//   document.body.appendChild(tempTextarea);
//   tempTextarea.select();

//   try {
//     const successful = document.execCommand('copy');
//     const message = successful ? 'راني نسختلك.. انشر برك' : 'شيت.. مشكلة فالنسخ';
//     alert(message);
//   } catch (err) {
//     console.error('Failed to copy text: ', err);
//   } finally {
//     document.body.removeChild(tempTextarea);
//   }
// }

function copyToClipboard(button) {
  const paragraph = button.parentNode;
  const textToCopy = paragraph.querySelector(".paragraph-text").innerHTML;

  const textWithNewlines = textToCopy.replace(/<br>/g, "\n");

  navigator.clipboard
    .writeText(textWithNewlines)
    .then(() => {
      alert("تم نسخ النص إلى الحافظة");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

function updateTextLength() {
  const inputText = document.getElementById("inputText").value;
  document.getElementById(
    "textLength"
  ).innerText = `عدد الأحرف: ${inputText.length}`;
}
