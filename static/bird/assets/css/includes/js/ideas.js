jQuery(document).ready(function ($) {

    $("#et_form_help").submit(function(e) {
        var ref = $(this).find("[required]");
        $(ref).each(function(){
            if ( $(this).val() == '' ) {
                $(this).focus();
                e.preventDefault();
                return false;
            }
        });  return true;
    });

    var body = $('body');

    body.on('click', '.idea_vote', function () {
        var click = $(this);
        var idea_id = click.attr('data-idea-id');
        var idea_voted = click.attr('data-idea-voted');
        var wrap = $('.wrap_vote_' + idea_id);
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: et_globals.ajaxURL,
            data: {
                action: 'et_idea_unvote',
                idea_id: idea_id,
                idea_voted: idea_voted,
                security: et_globals.nonce_idea_unvote
            },
            success: function (response) {
                if (response.type === 'success') {
                    wrap.attr('data-idea-voted', response.idea_voted);
                    wrap.find('.vote-count').text(response.idea_voted);
                    wrap.removeClass('idea_vote').addClass('idea_unvote');
                }
            }
        });
    });

    body.on('click', '.idea_unvote', function () {
        var click = $(this);
        var idea_id = click.attr('data-idea-id');
        var idea_voted = click.attr('data-idea-voted');
        var wrap = $('.wrap_vote_' + idea_id);
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: et_globals.ajaxURL,
            data: {
                action: 'et_idea_vote',
                idea_id: idea_id,
                idea_voted: idea_voted,
                security: et_globals.nonce_idea_vote
            },
            success: function (response) {
                wrap.attr('data-idea-voted', response.idea_voted);
                wrap.find('.vote-count').text(response.idea_voted);
                wrap.removeClass('idea_unvote').addClass('idea_vote');
            }
        });
    });

    body.on('click', '.filter-by-status li', function () {
        $('#overlay').addClass('loading-filter');
        $('body').addClass('noscroll');
        var status_filter = '';
        var cat_id = $('.filter-by-cat .active').attr('data-term-id');
        var my_idea = $('.filter-my-idea.active').attr('data-author-id');
        var my_vote = $('.filter-my-vote.active').attr('data-author-id');
        var string = $('#search-string').val();
        if (cat_id == undefined) {
            cat_id = 0;
        }
        if (my_idea == undefined) {
            my_idea = 0;
        }
        if (my_vote == undefined) {
            my_vote = 0;
        }
        if ($(this).hasClass('active')) {
            $('.filter-by-status li').removeClass('active');
        } else {
            $('.filter-by-status li').removeClass('active');
            $(this).addClass('active');
            status_filter = $(this).attr('data-status');
        }
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: et_globals.ajaxURL,
            data: {
                action: 'et_idea_filter',
                status: status_filter,
                cat_id: cat_id,
                my_idea: my_idea,
                my_vote: my_vote,
                string: string,
                security: et_globals.nonce_idea_filter
            },
            success: function (response) {
                $('#overlay').removeClass('loading-filter');
                $('body').removeClass('noscroll');
                $('.tab-content #recent').html(response.recent);
                $('.tab-content #trending').html(response.trending);
                $('.tab-content #popular').html(response.popular);
            }
        });
    });

    body.on('click', '.filter-by-cat li', function () {
        $('#overlay').addClass('loading-filter');
        $('body').addClass('noscroll');
        var cat_id = 0;
        var status_filter = $('.filter-by-status .active').attr('data-status');
        var my_idea = $('.filter-my-idea.active').attr('data-author-id');
        var my_vote = $('.filter-my-vote.active').attr('data-author-id');
        var string = $('#search-string').val();
        if (status_filter == undefined) {
            status_filter = '';
        }
        if (my_idea == undefined) {
            my_idea = 0;
        }
        if (my_vote == undefined) {
            my_vote = 0;
        }
        if ($(this).hasClass('active')) {
            $('.filter-by-cat li').removeClass('active');
        } else {
            $('.filter-by-cat li').removeClass('active');
            $(this).addClass('active');
            cat_id = $(this).attr('data-term-id');
        }
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: et_globals.ajaxURL,
            data: {
                action: 'et_idea_filter',
                status: status_filter,
                cat_id: cat_id,
                my_idea: my_idea,
                my_vote: my_vote,
                string: string,
                security: et_globals.nonce_idea_filter
            },
            success: function (response) {
                $('#overlay').removeClass('loading-filter');
                $('body').removeClass('noscroll');
                $('.tab-content #recent').html(response.recent);
                $('.tab-content #trending').html(response.trending);
                $('.tab-content #popular').html(response.popular);
            }
        });
    });

    body.on('click', 'a li.filter-my-idea', function () {
        $('#overlay').addClass('loading-filter');
        $('body').addClass('noscroll');
        var my_idea = 0;
        var cat_id = $('.filter-by-cat .active').attr('data-term-id');
        var status_filter = $('.filter-by-status .active').attr('data-status');
        var my_vote = $('.filter-my-vote.active').attr('data-author-id');
        var string = $('#search-string').val();
        if (cat_id == undefined) {
            cat_id = 0;
        }
        if (status_filter == undefined) {
            status_filter = '';
        }
        if (my_vote == undefined) {
            my_vote = 0;
        }
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
            my_idea = $(this).attr('data-author-id');
        }
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: et_globals.ajaxURL,
            data: {
                action: 'et_idea_filter',
                status: status_filter,
                cat_id: cat_id,
                my_idea: my_idea,
                my_vote: my_vote,
                string: string,
                security: et_globals.nonce_idea_filter
            },
            success: function (response) {
                $('#overlay').removeClass('loading-filter');
                $('body').removeClass('noscroll');
                $('.tab-content #recent').html(response.recent);
                $('.tab-content #trending').html(response.trending);
                $('.tab-content #popular').html(response.popular);
            }
        });
    });

    body.on('click', 'a li.filter-my-vote', function () {
        $('#overlay').addClass('loading-filter');
        $('body').addClass('noscroll');
        var my_vote = 0;
        var cat_id = $('.filter-by-cat .active').attr('data-term-id');
        var status_filter = $('.filter-by-status .active').attr('data-status');
        var my_idea = $('.filter-my-idea.active').attr('data-author-id');
        var string = $('#search-string').val();
        if (cat_id == undefined) {
            cat_id = 0;
        }
        if (status_filter == undefined) {
            status_filter = '';
        }
        if (my_idea == undefined) {
            my_idea = 0;
        }
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
            my_vote = $(this).attr('data-author-id');
        }
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: et_globals.ajaxURL,
            data: {
                action: 'et_idea_filter',
                status: status_filter,
                cat_id: cat_id,
                my_idea: my_idea,
                my_vote: my_vote,
                string: string,
                security: et_globals.nonce_idea_filter
            },
            success: function (response) {
                $('#overlay').removeClass('loading-filter');
                $('body').removeClass('noscroll');
                $('.tab-content #recent').html(response.recent);
                $('.tab-content #trending').html(response.trending);
                $('.tab-content #popular').html(response.popular);
            }
        });
    });

    body.on('click', '#search-submit', function () {
        var string = $('#search-string').val();
        if (string == '') {
            alert('Please enter idea keyword into search form!');
            $('#search-string').focus();
        } else {
            $('#overlay').addClass('loading-filter');
            $('body').addClass('noscroll');
            var cat_id = $('.filter-by-cat .active').attr('data-term-id');
            var status_filter = $('.filter-by-status .active').attr('data-status');
            var my_idea = $('.filter-my-idea.active').attr('data-author-id');
            var my_vote = $('.filter-my-vote.active').attr('data-author-id');
            if (cat_id == undefined) {
                cat_id = 0;
            }
            if (status_filter == undefined) {
                status_filter = '';
            }
            if (my_idea == undefined) {
                my_idea = 0;
            }
            if (my_vote == undefined) {
                my_vote = 0;
            }
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: et_globals.ajaxURL,
                data: {
                    action: 'et_idea_filter',
                    status: status_filter,
                    cat_id: cat_id,
                    my_idea: my_idea,
                    my_vote: my_vote,
                    string: string,
                    security: et_globals.nonce_idea_filter
                },
                success: function (response) {
                    $('#overlay').removeClass('loading-filter');
                    $('body').removeClass('noscroll');
                    $('.tab-content #recent').html(response.recent);
                    $('.tab-content #trending').html(response.trending);
                    $('.tab-content #popular').html(response.popular);
                }
            });
        }
    });

    body.on('click', '#more_idea_recent', function () {
        var click = $(this);
        $('#overlay').addClass('loading-filter');
        $('body').addClass('noscroll');
        var page = click.data('page');
        var ppp = click.data('ppp');
        var cat_id = $('.filter-by-cat .active').attr('data-term-id');
        var status_filter = $('.filter-by-status .active').attr('data-status');
        var my_idea = $('.filter-my-idea.active').attr('data-author-id');
        var my_vote = $('.filter-my-vote.active').attr('data-author-id');
        var string = $('#search-string').val();
        if (cat_id == undefined) {
            cat_id = 0;
        }
        if (status_filter == undefined) {
            status_filter = '';
        }
        if (my_idea == undefined) {
            my_idea = 0;
        }
        if (my_vote == undefined) {
            my_vote = 0;
        }
        $.ajax({
            type: 'post',
            dataType: 'html',
            url: et_globals.ajaxURL,
            data: {
                action: 'et_recent_load_more',
                status: status_filter,
                cat_id: cat_id,
                my_idea: my_idea,
                my_vote: my_vote,
                string: string,
                page: page,
                ppp: ppp,
                security: et_globals.nonce_ajax_load_more
            },
            success: function (response) {
                $('#overlay').removeClass('loading-filter');
                $('body').removeClass('noscroll');
                $('.tab-content #recent').html(response);
            }
        });
    });

    body.on('click', '#more_idea_trending', function () {
        var click = $(this);
        $('#overlay').addClass('loading-filter');
        $('body').addClass('noscroll');
        var page = click.data('page');
        var ppp = click.data('ppp');
        var cat_id = $('.filter-by-cat .active').attr('data-term-id');
        var status_filter = $('.filter-by-status .active').attr('data-status');
        var my_idea = $('.filter-my-idea.active').attr('data-author-id');
        var my_vote = $('.filter-my-vote.active').attr('data-author-id');
        var string = $('#search-string').val();
        if (cat_id == undefined) {
            cat_id = 0;
        }
        if (status_filter == undefined) {
            status_filter = '';
        }
        if (my_idea == undefined) {
            my_idea = 0;
        }
        if (my_vote == undefined) {
            my_vote = 0;
        }
        $.ajax({
            type: 'post',
            dataType: 'html',
            url: et_globals.ajaxURL,
            data: {
                action: 'et_trending_load_more',
                status: status_filter,
                cat_id: cat_id,
                my_idea: my_idea,
                my_vote: my_vote,
                string: string,
                page: page,
                ppp: ppp,
                security: et_globals.nonce_ajax_load_more
            },
            success: function (response) {
                $('#overlay').removeClass('loading-filter');
                $('body').removeClass('noscroll');
                $('.tab-content #trending').html(response);
            }
        });
    });

    body.on('click', '#more_idea_popular', function () {
        var click = $(this);
        $('#overlay').addClass('loading-filter');
        $('body').addClass('noscroll');
        var page = click.data('page');
        var ppp = click.data('ppp');
        var cat_id = $('.filter-by-cat .active').attr('data-term-id');
        var status_filter = $('.filter-by-status .active').attr('data-status');
        var my_idea = $('.filter-my-idea.active').attr('data-author-id');
        var my_vote = $('.filter-my-vote.active').attr('data-author-id');
        var string = $('#search-string').val();
        if (cat_id == undefined) {
            cat_id = 0;
        }
        if (status_filter == undefined) {
            status_filter = '';
        }
        if (my_idea == undefined) {
            my_idea = 0;
        }
        if (my_vote == undefined) {
            my_vote = 0;
        }
        $.ajax({
            type: 'post',
            dataType: 'html',
            url: et_globals.ajaxURL,
            data: {
                action: 'et_popular_load_more',
                status: status_filter,
                cat_id: cat_id,
                my_idea: my_idea,
                my_vote: my_vote,
                string: string,
                page: page,
                ppp: ppp,
                security: et_globals.nonce_ajax_load_more
            },
            success: function (response) {
                $('#overlay').removeClass('loading-filter');
                $('body').removeClass('noscroll');
                $('.tab-content #popular').html(response);
            }
        });
    });

});