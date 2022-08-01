import type { Request, Response } from '@sveltejs/kit';
import stripe from './_stripe';

export async function post(req: Request<any, { priceId: string, shirtId: string }>): Promise<Response> {
	if (typeof req.body.priceId !== 'string') {
		return {
			status: 400,
			headers: {},
			body: JSON.stringify({
				error: {
					message: 'priceId is required'
				}
			})
		};
	}

	const priceId = req.body.priceId;
	const shirtId = req.body.shirtId;
	console.log(priceId, shirtId)
	try {
		const session = await stripe.checkout.sessions.create({
			mode: 'payment',
			payment_method_types: ['card'],
			line_items: [
				{
					price: priceId,
					quantity: 1
				}
			],
			shipping_address_collection: {
				allowed_countries: ['CZ']
			},
			payment_intent_data: {
				metadata: {
					shirt: shirtId,
				},
			},
			success_url: `http://${req.host}/success?sessionId={CHECKOUT_SESSION_ID}`,
			cancel_url: `http://${req.host}/generate`
		});
		return {
			status: 200,
			headers: {},
			body: JSON.stringify({
				sessionId: session.id
			})
		};
	} catch (err) {
		return {
			status: 500,
			headers: {},
			body: JSON.stringify({
				error: err
			})
		};
	}
}
