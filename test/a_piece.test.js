var request = require('supertest');
a = require('../a_routes/a_piece');

describe("a_piece", function(){
    it("makes sure there is access to Public Pieces", function(done){
        //request(a).get("/")
        chai.request('http://localhost:5000')
        .get('../a_db.js')
        .end((req,res)=>{
            res.should.have.status(200)
            res.body.should.be.a(json())
            done()
        })
    })
})