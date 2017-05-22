/*
1. Attach event listener to submit button and enter key
	a. Get the value of the input 
	b. Add that value to state
	c. Render that item to the DOM
2. Attach event listener to check button
	a. find that item in state.items
	b. update state.items[that item] to have item.checked = true
	c. rerender
3. Attach event listener to delete button
	a. find that item in state.items
	b. remove that item from state.items
	c. rerender list
*/

//single state object
var state = {
  items: []
};

//state mod function
function addItem(state, item) {
  state.items.push({
	name: item,
  checked: false
  });
}
  	
//render function
var renderList = function(state, element) {
  var itemsHTML = state.items.map(function(item) {
       return getTemplate(item)
         });
  element.html(itemsHTML);
};

function getTemplate(item) {
	var strikeClass = item.checked ? 'shopping-item__checked' : '';
	var template = '<li>' +
        '<span class="shopping-item '+ strikeClass + '">'+ item.name +'</span>' +
        '<div class="shopping-item-controls">' +
          '<button class="shopping-item-toggle">' +
            '<span class="button-label">check</span>' +
          '</button>' +
          '<button class="shopping-item-delete">' +
            '<span class="button-label">delete</span>' +
          '</button>' +
       '</div>' +
      '</li>' 
      return template;
}

/*
1. Attach event listener to submit button and enter key
  a. Get the value of the input 
  b. Add that value to state
  c. Render that item to the DOM
2. Attach event listener to check button
  a. find that item in state.items
  b. update state.items[that item] to have item.checked = true
  c. rerender
3. Attach event listener to delete button
  a. find that item in state.items
  b. remove that item from state.items
  c. rerender list
*/

$(".shopping-list").on("click", ".shopping-item-delete", function(event) {
    event.preventDefault();
    var inputfield = $('#entry').val();
  var itemClicked = $(this).parent('div').parent('li').find('.shopping-item').text();
  
  for(var i = 0; i<state.items.length; i++) {
    if(state.items[i].name === itemClicked) {
      state.items.splice(i, 1);
    }
  }
  renderList(state, $('.shopping-list'));
});

$(".shopping-list").on("click", ".shopping-item-toggle", function(even) {
   var inputfield = $('#entry').val();
    var checkItem = $(this).parent('div').parent('li').find('.shopping-item').text();
    for(var i = 0; i<state.items.length; i++){
      if(state.items[i].name === checkItem) {
        state.items[i].checked = true;
      }
    }
    renderList(state, $('.shopping-list'));
});


$(function() {
  // will run when the page is fully loaded
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    var newItem = $('#shopping-list-entry').val()
    addItem(state, newItem)
    renderList(state, $('.shopping-list'))
  });
});
