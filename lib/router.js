Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
});

Router.route('/', {name: 'postsList'});

Router.route('/posts/:_id', {
    name:'postPage',
    data: function () { return Posts.findOne(this.params._id);

    }
});

Router.route('/submit' , {name : 'postSubmit'})

Router.route('/posts/:_id/edit', {  name: 'postEdit',  data: function() { return Posts.findOne(this.params._id); }});

var requireLogin = function() {
    if (! Meteor.user()) {
    this.render('accessDenied');
    }
    else {
        this.next();
    }}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});

Router.onBeforeAction(requireLogin, {only: 'postSubmit'});