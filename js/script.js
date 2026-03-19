
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  var topBtn = $('.pagetop');
  topBtn.hide();

  // ボタンの表示設定
  $(window).scroll(function () {
    if ($(this).scrollTop() > 70) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  // ボタンをクリックしたらスクロールして上に戻る
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 300, 'swing');
    return false;
  });

  //ドロワーメニュー
  $("#MenuButton").click(function () {
    // $(".l-drawer-menu").toggleClass("is-show");
    // $(".p-drawer-menu").toggleClass("is-show");
    $(".js-drawer-open").toggleClass("open");
    $(".drawer-menu").toggleClass("open");
    $("html").toggleClass("is-fixed");

  });



  // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)

  $(document).on('click', 'a[href*="#"]', function () {
    let time = 400;
    let header = $('header').innerHeight();
    let target = $(this.hash);
    if (!target.length) return;
    let targetY = target.offset().top - header;
    $('html,body').animate({ scrollTop: targetY }, time, 'swing');
    return false;
  });

  // お申し込み / お問い合わせ タブ切り替え
  const $tabs = $('.js-contact-tab');
  const $panels = $('.js-contact-panel');

  function setActiveTab(tabEl) {
    const $tab = $(tabEl);
    const targetId = $tab.attr('aria-controls');

    $tabs.each(function () {
      const isActive = this === tabEl;
      $(this)
        .toggleClass('is-active', isActive)
        .attr('aria-selected', isActive ? 'true' : 'false')
        .attr('tabindex', isActive ? '0' : '-1');
    });

    $panels.each(function () {
      const isTarget = this.id === targetId;
      $(this).prop('hidden', !isTarget);
    });
  }

  $tabs.on('click', function () {
    setActiveTab(this);
  });

  $tabs.on('keydown', function (e) {
    const key = e.key;
    if (key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Home' && key !== 'End') return;

    e.preventDefault();
    const currentIndex = $tabs.index(this);
    let nextIndex = currentIndex;

    if (key === 'ArrowLeft') nextIndex = Math.max(0, currentIndex - 1);
    if (key === 'ArrowRight') nextIndex = Math.min($tabs.length - 1, currentIndex + 1);
    if (key === 'Home') nextIndex = 0;
    if (key === 'End') nextIndex = $tabs.length - 1;

    const nextTab = $tabs.get(nextIndex);
    nextTab.focus();
    setActiveTab(nextTab);
  });

});
