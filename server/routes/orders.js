import express from 'express';
import { supabase } from '../lib/supabase.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user orders
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product:products (*)
        )
      `)
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Create order
router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const { items } = req.body;
    
    // Start a transaction
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          user_id: req.user.id,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items and update product stock
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Update product stock
    for (const item of items) {
      const { error: stockError } = await supabase.rpc('update_product_stock', {
        p_product_id: item.product_id,
        p_quantity: item.quantity
      });

      if (stockError) throw stockError;
    }

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

// Get order details
router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product:products (*)
        )
      `)
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export { router as orderRoutes };