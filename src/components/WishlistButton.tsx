import React from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface WishlistButtonProps {
  productId: string;
  isWishlisted: boolean;
  onToggleWishlist: () => Promise<void>;
}

export default function WishlistButton({ 
  productId, 
  isWishlisted, 
  onToggleWishlist 
}: WishlistButtonProps) {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    if (!user) {
      toast.error('Please sign in to add items to your wishlist');
      return;
    }

    setLoading(true);
    try {
      await onToggleWishlist();
      toast.success(
        isWishlisted 
          ? 'Removed from wishlist' 
          : 'Added to wishlist'
      );
    } catch (error) {
      toast.error('Failed to update wishlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`p-2 rounded-full ${
        isWishlisted
          ? 'text-red-500 hover:bg-red-50'
          : 'text-gray-400 hover:bg-gray-50'
      }`}
    >
      <Heart
        className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`}
      />
    </button>
  );
}