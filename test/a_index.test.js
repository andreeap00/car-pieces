//mocha

var request = require('supertest');
a = require('../a_index');

describe("a_index", function(){
    it("makes sure the app functions", function(done){
        request(a).get("/")
        .expect(200)
        .expect(/Hi, it works!/, done)
    })
})