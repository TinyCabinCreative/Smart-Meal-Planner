import type { SuperstoreProduct } from '~/types';

/**
 * Server endpoint to search Real Canadian Superstore products
 * Uses the unofficial PC Express API
 */
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const searchTerm = query.q as string;
  const postalCode = query.postal as string || 'V5K0A1'; // Default Vancouver

  if (!searchTerm) {
    throw createError({
      statusCode: 400,
      message: 'Search term is required'
    });
  }

  try {
    // PC Express API endpoint
    const response = await $fetch('https://api.pcexpress.ca/product-facade/v3/products/search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Site-Banner': 'superstore',
        'X-Apikey': '1im1hL52q9xvta16GlSdYDsTsG0dmyhF',
        'Origin': 'https://www.realcanadiansuperstore.ca'
      },
      body: {
        pagination: {
          from: 0,
          size: 20
        },
        banner: 'superstore',
        query: searchTerm,
        locale: 'en',
        postalCode: postalCode
      }
    });

    // Transform the response to our format
    const products: SuperstoreProduct[] = (response as any).results?.map((item: any) => ({
      code: item.code,
      name: item.name || item.description,
      brand: item.brand || 'No Name',
      price: item.prices?.price?.value || 0,
      unit: item.prices?.price?.unit || 'each',
      description: item.description || '',
      imageUrl: item.imageUrl
    })) || [];

    return {
      success: true,
      count: products.length,
      products
    };

  } catch (error: any) {
    console.error('Superstore API Error:', error);
    
    // Return fallback mock data if API fails
    return {
      success: false,
      count: 0,
      products: [],
      error: 'Unable to fetch real-time prices. Please try again later.'
    };
  }
});
