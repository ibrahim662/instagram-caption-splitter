function updateTextLength() {
    const inputText = document.getElementById('inputText').value;
    document.getElementById('textLength').innerText = `عدد الأحرف: ${inputText.length}`;
  }
  
  function splitText() {
    const inputText = document.getElementById('inputText').value;
    const maxLength = 2200;
    const separator = '.\n\n';
  
    if (!inputText) {
      alert('الرجاء إدخال نص.');
      return;
    }
  
    updateTextLength(); // Update one more time to ensure the accurate length is displayed
  
    let result = '';
    let remainingText = inputText.replace(/\n/g, '<br>'); // Replace line breaks with <br> tags
    let paragraphNumber = 1;
  
    while (remainingText.length > 0) {
      let chunk = remainingText.substring(0, maxLength);
  
      // For subsequent splits, add a dot and a line break
      if (paragraphNumber > 1) {
        chunk += separator;
      }
  
      const lastSpaceIndex = chunk.lastIndexOf(' ');
      if (lastSpaceIndex !== -1) {
        chunk = chunk.substring(0, lastSpaceIndex);
        remainingText = remainingText.substring(lastSpaceIndex + 1);
      } else {
        remainingText = remainingText.substring(chunk.length);
      }
  
      const chunkLength = chunk.length - separator.length; // Exclude the separator length
      result += `<div class="paragraph">الفقرة ${paragraphNumber}</div>${chunk}<div class="length">عدد الأحرف: ${chunkLength}</div>`;
      paragraphNumber++;
    }
  
    document.getElementById('result').innerHTML = result;
  }
  