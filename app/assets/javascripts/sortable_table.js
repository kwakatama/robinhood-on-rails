SortableTables = function(element) {

  var update_list = function(target, drag_target) {
    id = target.data("id")
    instrument_order = []
    $.each(target.find(".investment"), function(index,e) {
      instrument_order.push($(e).data("instrument-id"))
    })
    $.post("reorder_positions", {id: id, instrument_id: drag_target.data("instrument-id"), instrument_order: instrument_order})
  }

  var init = function() {
    $(".sortable-table").sortable({
        items: ".investment",
        connectWith: ".sortable-table",
        receive: function(event,ui) {
          // item moved to a different list
          update_list($(event.target), $(ui.item))
        },
        stop: function(event,ui){
          if($(event.target).find(ui.item).parent().length) {
            // item moved within the same list
            update_list($(event.target), $(ui.item))
          }
        }
    })
  }

  init()
}