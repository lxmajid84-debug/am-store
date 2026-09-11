// script.js
const SUPABASE_URL = "https://zvwplxywhtxeegujrzrr.supabase.co";
const SUPABASE_KEY = "sb_publishable_Cc6UXTWopHrhoSvjbo6jYw_sw4iQM5c";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to get all products
async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data;
}

// Function to upload image to Supabase Storage
async function uploadImage(file) {
  const fileName = `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file);
    
  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }
  
  // Get public URL
  const { data: urlData } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName);
    
  return urlData.publicUrl;
}

// Function to add product (Admin only)
async function addProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .insert([product]);
    
  if (error) {
    console.error('Error adding product:', error);
    return false;
  }
  return true;
}

// Function to delete product (Admin only)
async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }
  return true;
}
