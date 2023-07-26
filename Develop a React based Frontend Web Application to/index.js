const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8008;

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls) {
    return res.status(400).json({ error: 'No URLs provided in query parameters.' });
  }

  const urlArray = Array.isArray(urls) ? urls : [urls];

  try {
    async function getNumbers(urls) {
      const promises = urls.map(async (url) => {
        try {
          const response = await axios.get(url);
          return response.data.numbers;
        } catch (error) {
          console.error(`Error fetching data from URL: ${url}`);
          return [];
        }
      });

      const results = await Promise.allSettled(promises);
      const mergedNumbers = Array.from(new Set(results.flatMap(result => result.status === 'fulfilled' ? result.value : [])));
      return mergedNumbers.sort((a, b) => a - b);
    }

    const mergedNumbers = await getNumbers(urlArray);

    res.json({ numbers: mergedNumbers });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
