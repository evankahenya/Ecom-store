import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onEdit, onDelete, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    toast.success("Added to cart!");
  };

  return (
    <Card 
      className="product-card overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
        />
        {isHovered && (
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => onEdit(product)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => onDelete(product.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}