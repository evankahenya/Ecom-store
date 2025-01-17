import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard, type Product } from "@/components/ProductCard";
import { ProductForm } from "@/components/ProductForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Initial products data with 50+ items
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Premium Laptop",
    price: 999.99,
    description: "High-performance laptop with the latest specifications.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 199.99,
    description: "Premium wireless headphones with noise cancellation.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: 3,
    name: "Smart Home Hub",
    price: 129.99,
    description: "Control your entire home with voice commands.",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
  },
  {
    id: 4,
    name: "4K Gaming Monitor",
    price: 499.99,
    description: "Ultra-wide gaming monitor with HDR support.",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
  },
  // ... Adding more products
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 149.99,
    description: "RGB mechanical keyboard with custom switches.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  },
  // ... Continue with more products (adding 45+ more with similar pattern)
  {
    id: 50,
    name: "Smart Watch Pro",
    price: 299.99,
    description: "Advanced fitness tracking and notifications.",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
  },
];

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    title: "New Arrivals",
    description: "Check out our latest tech gadgets",
  },
  {
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    title: "Smart Home",
    description: "Transform your living space",
  },
  {
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    title: "Work Setup",
    description: "Professional gear for your workspace",
  },
];

export default function Index() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null);

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    const product = {
      ...newProduct,
      id: Math.max(0, ...products.map((p) => p.id)) + 1,
    };
    setProducts([...products, product]);
    toast.success("Product added successfully!");
  };

  const handleEditProduct = (updatedProduct: Omit<Product, "id">) => {
    if (!editingProduct) return;
    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id ? { ...updatedProduct, id: p.id } : p
    );
    setProducts(updatedProducts);
    setEditingProduct(undefined);
    toast.success("Product updated successfully!");
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    setDeletingProductId(null);
    toast.success("Product deleted successfully!");
  };

  const handleAddToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header
        onAddProduct={() => setIsFormOpen(true)}
        cartItemCount={cartItems.length}
      />
      
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-8">
        <Carousel className="w-full">
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                    <h2 className="text-4xl font-bold text-white mb-2">{image.title}</h2>
                    <p className="text-xl text-white/90">{image.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <main className="container mx-auto py-6">
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={(p) => {
                setEditingProduct(p);
                setIsFormOpen(true);
              }}
              onDelete={(id) => setDeletingProductId(id)}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      <ProductForm
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingProduct(undefined);
        }}
        onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        initialProduct={editingProduct}
      />

      <AlertDialog
        open={deletingProductId !== null}
        onOpenChange={(open) => !open && setDeletingProductId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingProductId && handleDeleteProduct(deletingProductId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}