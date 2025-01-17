import { ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onAddProduct: () => void;
  cartItemCount: number;
}

export function Header({ onAddProduct, cartItemCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">ShopHub</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <input
              type="search"
              placeholder="Search products..."
              className="w-full md:w-[300px] h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={onAddProduct} variant="default">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
            <Button variant="ghost" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}