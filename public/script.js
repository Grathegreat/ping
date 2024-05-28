document.getElementById('pingForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const url = document.getElementById('urlInput').value;
  try {
    const response = await fetch(`/ping?url=${encodeURIComponent(url)}`);
    const text = await response.text();
    document.getElementById('response').textContent = text;
  } catch (error) {
    document.getElementById('response').textContent = 'Error pinging URL';
  }
});