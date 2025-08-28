import { NextRequest, NextResponse } from 'next/server';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search')?.toLowerCase();
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    
    let filteredProducts = [...MOCK_PRODUCTS];
    
    // Apply search filter
    if (search) {
      filteredProducts = filteredProducts.filter(
        (p) => 
          p.name.toLowerCase().includes(search) || 
          (p.description && p.description.toLowerCase().includes(search)) ||
          (p.tags && p.tags.some(tag => tag.toLowerCase().includes(search)))
      );
    }
    
    // Apply category filter
    if (category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === category || (p.categories && p.categories.includes(category))
      );
    }
    
    // Apply sorting
    if (sort) {
      switch (sort) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          // Default sorting (newest first)
          break;
      }
    }
    
    return NextResponse.json(filteredProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Generate a new ID (in a real app, this would be handled by the database)
    const newId = Math.max(...MOCK_PRODUCTS.map(p => p.id)) + 1;
    
    const newProduct = {
      ...data,
      id: newId,
      createdAt: new Date().toISOString()
    };
    
    // In a real app, we would save to database
    // For mock data, we'll add to the array
    MOCK_PRODUCTS.push(newProduct);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}