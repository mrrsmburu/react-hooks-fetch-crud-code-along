import React, { useEffect,useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => console.log(items));
    }, []);
  
    function handleDeleteItem(deletedItem) {
      console.log("In ShoppingCart:", deletedItem);
    }
   
    function handleAddItem(newItem) {
      setItems([...items, newItem]);
    }
    function handleUpdateItem(updatedItem) {
      const updatedItems = items.map((item) => {
        if (item.id === updatedItem.id) {
          return updatedItem;
        } else {
          return item;
        }
      });
      setItems(updatedItems);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} />
        ))}
      </ul>
    </div>
  );
}
}
export default ShoppingList;
