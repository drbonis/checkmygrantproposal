const redFlags = [
    "accessible", "activism", "activists", "advocacy", "advocate", "advocates", "affirming care", "all-inclusive",
    "allyship", "anti-racism", "antiracist", "assigned at birth", "assigned female at birth", "assigned male at birth",
    "at risk", "barrier", "barriers", "belong", "bias", "biased", "biased toward", "biases", "biases towards",
    "biologically female", "biologically male", "BIPOC", "Black", "breastfeed", "breastfeed",
    "chestfeed", "clean energy", "climate crisis", "climate science",
    "commercial sex worker", "community diversity", "community equity", "confirmation bias", "cultural competence",
    "cultural differences", "cultural heritage", "cultural sensitivity", "culturally appropriate",
    "culturally responsive", "DEI", "DEIA", "DEIAB", "DEIJ", "disabilities", "disability", "discriminated",
    "discrimination", "discriminatory", "disparity", "diverse", "diverse backgrounds", "diverse communities",
    "diverse community", "diverse group", "diverse groups", "diversified", "diversify", "diversifying", "diversity",
    "enhance the diversity", "enhancing diversity", "environmental quality", "equal opportunity", "equality", "equitable",
    "equitableness", "equity", "ethnicity", "excluded", "exclusion", "expression", "female", "females", "feminism",
    "fostering inclusivity", "GBV", "gender", "gender based", "gender based violence", "gender diversity",
    "gender identity", "gender ideology", "gender-affirming care", "genders", "Gulf of Mexico", "hate speech",
    "health disparity", "health equity", "hispanic minority", "historically", "identity", "immigrants", "implicit bias",
    "implicit biases", "inclusion", "inclusive", "inclusive leadership", "inclusiveness", "inclusivity",
    "increase diversity", "increase the diversity", "indigenous community", "inequalities", "inequality", "inequitable",
    "inequities", "inequity", "injustice", "institutional", "intersectional", "intersectionality", "key groups",
    "key people", "key populations", "Latinx", "LGBT", "LGBTQ", "marginalize", "marginalized", "men who have sex with men",
    "mental health", "minorities", "minority", "most risk", "MSM", "multicultural", "Mx", "Native American", "non-binary",
    "nonbinary", "oppression", "oppressive", "orientation", "people + uterus", "people-centered care", "person-centered",
    "person-centered care", "polarization", "political", "pollution", "pregnant people", "pregnant person",
    "pregnant persons", "prejudice", "privilege", "privileges", "promote diversity", "promoting diversity", "pronoun",
    "pronouns", "prostitute", "race", "race and ethnicity", "racial", "racial diversity", "racial identity",
    "racial inequality", "racial justice", "racially", "racism", "segregation", "sense of belonging", "sex",
    "sexual preferences", "sexuality", "social justice", "sociocultural", "socioeconomic", "status", "stereotype",
    "stereotypes", "systemic", "systemically", "they/them", "trans", "transgender", "transsexual", "trauma", "traumatic",
    "tribal", "unconscious bias", "underappreciated", "underprivileged", "underrepresentation", "underrepresented",
    "underserved", "undervalued", "victim", "victims", "vulnerable populations", "women", "women and underrepresented"
];

function checkText() {
    const text = document.getElementById('textInput').value;
    const results = [];
    redFlags.forEach(flag => {
        const regex = new RegExp(`.{0,15}\\b${flag}\\b.{0,15}`, 'gi');
        let match;
        while ((match = regex.exec(text)) !== null) {
            const start = Math.max(match.index - 15, 0);
            const end = Math.min(match.index + match[0].length + 15, text.length);
            const context = text.substring(start, end);
            const highlightedContext = context.replace(new RegExp(`\\b${flag}\\b`, 'gi'), `<span class="highlight">${flag}</span>`);
            results.push({
                plainContext: context,
                highlightedContext: highlightedContext
            });
        }
    });
    displayResults(results);
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (results.length > 0) {
        results.forEach(result => {
            const item = document.createElement('div');
            item.className = 'result-item';
            item.innerHTML = result.highlightedContext;
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-btn';
            copyButton.innerHTML = '<i class="bi bi-clipboard"></i>';
            copyButton.onclick = function() { copyToClipboard(result.plainContext); };
            item.appendChild(copyButton);
            resultsDiv.appendChild(item);
        });
    } else {
        resultsDiv.textContent = 'No red-flag terms found.';
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showPopup('Text copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

function showPopup(message) {
    const popup = document.getElementById('popup') || createPopup();
    popup.textContent = message;
    popup.style.opacity = 1;
    popup.style.visibility = 'visible';
    setTimeout(() => {
        popup.style.opacity = 0;
        setTimeout(() => popup.style.visibility = 'hidden', 500);
    }, 2000);
}

function createPopup() {
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.className = 'popup';
    document.body.appendChild(popup);
    return popup;
}
