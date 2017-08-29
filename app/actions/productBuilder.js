const VARIANT_LIMIT = 100; // Shopify limits number of variants to 100

// Convert Etsy json object to be Shopify compatible
export default function buildProduct(data){
	const options = getOptions(data.Variations);
	return {
		"product": {
			title: data.title,
			body_html: data.description,
			vendor: "Spocket",
			product_type: data.category_path[0],
			tags: data.tags,
			images: data.Images.map(image => {return {src: image.url_fullxfull}}),
			options,
			variants: getVariants(data.Inventory[0].products, options),
			price: data.price
		}
	}

	function getVariants(products, options){
		const variants = []
		products.forEach(product => {
			const props = {}
			product.property_values.forEach(value => {
					props['option'+getIndex(options, value.property_id)] = value.values[0]
			});
			
			if(variants.length >= VARIANT_LIMIT)
				return variants;
			
			variants.push({
				inventory_management: "shopify",
				inventory_quantity: product.offerings[0].quantity,
				price: product.offerings[0].price.amount/100,
				sku: product.product_id,
				...props
			})
		})
		return variants;
	}

	function getOptions(variations){
		return variations.map( (variant, i) => {
			const values = variant.options.map(option => {return option.value});
			return {
				name: variant.formatted_name,
				position: i+1,
				id: variant.property_id,
				values
			}
		})
	}
	function getIndex(options, id){
		return options.filter(option => {
			return id === option.id;
		})[0].position;
	}

}