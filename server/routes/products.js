import express from 'express';
import { supabase } from '../lib/supabase.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .gt('stock', 0)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Get single product
router.get('/:id', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Create product (protected, seller only)
router.post('/', authenticateToken, async (req, res, next) => {
  try {
    if (!req.user.is_seller) {
      return res.status(403).json({ message: 'Seller access required' });
    }

    const { name, description, price, stock, image_url } = req.body;
    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name,
          description,
          price,
          stock,
          image_url,
          seller_id: req.user.id
        }
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

// Update product (protected, seller only)
router.put('/:id', authenticateToken, async (req, res, next) => {
  try {
    const { data: product } = await supabase
      .from('products')
      .select('seller_id')
      .eq('id', req.params.id)
      .single();

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.seller_id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { name, description, price, stock, image_url } = req.body;
    const { data, error } = await supabase
      .from('products')
      .update({ name, description, price, stock, image_url })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Delete product (protected, seller only)
router.delete('/:id', authenticateToken, async (req, res, next) => {
  try {
    const { data: product } = await supabase
      .from('products')
      .select('seller_id')
      .eq('id', req.params.id)
      .single();

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.seller_id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { router as productRoutes };