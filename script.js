const inrAmount = document.getElementById('inrAmount');
const usdAmount = document.getElementById('usdAmount');
const convertButton = document.getElementById('convertButton');

let INR_TO_USD_RATE = 0.012; // fallback approximate conversion rate

function formatUsd(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

async function fetchLiveRate() {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/INR');
    if (response.ok) {
      const data = await response.json();
      INR_TO_USD_RATE = data.rates.USD;
      console.log('Live rate fetched:', INR_TO_USD_RATE);
    }
  } catch (error) {
    console.error('Failed to fetch live rate, using fallback:', error);
  }
}

function convertCurrency() {
  const inrValue = parseFloat(inrAmount.value);
  if (Number.isFinite(inrValue) && inrValue >= 0) {
    const usdValue = inrValue * INR_TO_USD_RATE;
    usdAmount.value = formatUsd(usdValue);
  } else {
    usdAmount.value = '';
  }
}

// Fetch live rate on page load
fetchLiveRate();

convertButton.addEventListener('click', convertCurrency);
inrAmount.addEventListener('input', convertCurrency);
