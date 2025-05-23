🌍 Currency Converter API
A simple and powerful RESTful API for converting currencies in real-time using up-to-date exchange rates. Built with scalability and ease of use in mind.

🚀 Features
💱 Convert between major global currencies

🌐 Real-time exchange rate data

🧪 Easy-to-use REST endpoints

📈 Future-ready for historical or batch conversions

📦 Technologies Used
Node.js / Express (or your stack)

MongoDB (optional, for user data/logs)

External API (e.g., ExchangeRate-API, Open Exchange Rates)

Axios / Fetch for HTTP requests

🔧 Setup Instructions
Clone the repository

bash
Copy
Edit
git clone https://github.com/your-username/currency-converter-api.git
cd currency-converter-api
Install dependencies

bash
Copy
Edit
npm install
Set environment variables

Create a .env file in the root folder and add:

env
Copy
Edit
PORT=3000
API_KEY=your_exchange_rate_api_key
BASE_URL=https://api.exchangerate-api.com/v4/latest
Start the server

bash
Copy
Edit
npm start
📡 API Endpoints
Convert Currency
sql
Copy
Edit
GET /api/convert?from=USD&to=EUR&amount=100
Query Params:

from: Currency code to convert from

to: Currency code to convert to

amount: Amount to convert

Response:

json
Copy
Edit
{
"from": "USD",
"to": "EUR",
"amount": 100,
"converted": 91.75,
"rate": 0.9175
}
🧪 Example Usage (cURL)
bash
Copy
Edit
curl "http://localhost:3000/api/convert?from=USD&to=NGN&amount=50"
🛠 Future Improvements
Add authentication for premium access

Support historical conversion data

Allow batch currency conversions

Dashboard UI for analytics

🙌 Contributing
Contributions are welcome! Please fork the repo, make your changes, and submit a pull request.
