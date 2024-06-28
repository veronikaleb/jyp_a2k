$(function(){
	$(function() {
  var Accordion = function(el, multiple) {
    this.el = el || {};
    // more then one submenu open?
    this.multiple = multiple || false;
    
    var dropdownlink = this.el.find('.dropdownlink');
    dropdownlink.on('click',
                    { el: this.el, multiple: this.multiple },
                    this.dropdown);
  };
  
  Accordion.prototype.dropdown = function(e) {
    var $el = e.data.el,
        $this = $(this),
        //this is the ul.submenuItems
        $next = $this.next();
    
    $next.slideToggle();
    $this.parent().toggleClass('open');
    
    if(!e.data.multiple) {
      //show only one menu at the same time
      $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
    }
  }
  
  var accordion = new Accordion($('.accordion-menu'), false);
})
	
	
//2
// Зберігаємо дані про відвідувачів у локальному сховищі браузера (LocalStorage)
const visitorsData = JSON.parse(localStorage.getItem('visitors')) || [];

// Оновлюємо дані про відвідувачів
function updateVisitorData() {
  const timestamp = Date.now();
  visitorsData.push(timestamp);
  localStorage.setItem('visitors', JSON.stringify(visitorsData));
}

// Оновлюємо відображення кількості відвідувачів
function updateCounterDisplay() {
  const totalVisitorsElement = document.getElementById('totalVisitors');
  const onlineVisitorsElement = document.getElementById('onlineVisitors');

  totalVisitorsElement.textContent = visitorsData.length;

  const currentTime = Date.now();
  // Визначаємо кількість користувачів, які зараз онлайн (за останні 5 хвилин)
  const onlineVisitors = visitorsData.filter(timestamp => currentTime - timestamp <= 5 * 60 * 1000).length;
  onlineVisitorsElement.textContent = onlineVisitors;
}

// Викликаємо функції для оновлення даних та відображення після завантаження сторінки
updateVisitorData();
updateCounterDisplay();	
	

});