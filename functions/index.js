const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

admin.initializeApp(); // Ensure this line works now
const db = admin.firestore();

const app = express();

app.get('/products', async (req, res) => {
try {
const productCollection = await db.collection('postRequests')
    .where('status', '==', 'approved')
    .get();

const products = productCollection.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
}));

res.status(200).json(products);
} catch (error) {
console.error("Error fetching products:", error);
res.status(500).json({ error: 'Failed to fetch products' });
}
});

exports.api = functions.https.onRequest(app);
