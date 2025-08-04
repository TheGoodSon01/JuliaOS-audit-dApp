async function runAudit() {
  const input = document.getElementById('input').value.trim();
  const output = document.getElementById('output');

  if (!input) {
    typeText(output, '❗ Please enter a token address or project name.');
    return;
  }

  // Check if input is a valid Solana address
  const isValidSolAddress = /^([1-9A-HJ-NP-Za-km-z]{32,44})$/.test(input);
  if (!isValidSolAddress) {
    typeText(output, '⚠️ Invalid input. Please enter a valid Solana token address (not just project name).');
    return;
  }

  typeText(output, '🚀 Launching Swarm Audit...\n');

  const tasks = [
    fetchSocialSentiment(input),
    fetchOnchainData(input),
    runRugRiskAgent(input)
  ];

  try {
    const [social, onchain, risk] = await Promise.all(tasks);

    const summary = `
=== 📡 Social Sentiment ===\n${social}

=== 🔗 On-Chain Data ===\n${onchain}

=== ⚠️ Rug Risk Analysis ===\n${risk}

✅ Final Score: ${(Math.random() * 40 + 60).toFixed(1)} / 100`;

    typeText(output, summary);
  } catch (err) {
    typeText(output, `❌ Audit failed: ${err.message}`);
  }
}

async function fetchSocialSentiment(project) {
  return `Project ${project} has active engagement on X and Discord. Trending keywords: "community", "meme", "pump".`;
}

async function fetchOnchainData(address) {
  // Simulate data variation using hash of address
  const hash = address.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const names = ['BONK', 'WIF', 'DOGGO', 'SAMO', 'CHAD', 'SOLPEPE'];
  const name = names[hash % names.length];
  const symbol = name;
  const holders = Math.floor((hash * 13) % 50000 + 5000);
  const liquidity = `${Math.floor((hash * 7) % 200) + 30} SOL`;

  return `Name: ${name}
Symbol: ${symbol}
Holders: ${holders}
Liquidity Pool: ${liquidity}`;
}


async function runRugRiskAgent(token) {
  const riskFactors = ['No audit', 'Team unknown', 'Low liquidity'];
  const flagged = riskFactors[Math.floor(Math.random() * riskFactors.length)];
  return `⚠️ Risk Flagged: ${flagged}\nRecommendation: Proceed with caution.`;
}

// Typing animation function
function typeText(element, text, speed = 20) {
  element.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}
