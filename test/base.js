const base = artifacts.require('base.sol');
const truffleAssert = require('truffle-assertions');

contract('base',(accounts)=>{
    let instance;
    beforeEach('should setup the contract instance',async()=>{
        instance = await base.deployed();
    });

    it("should confirm if the first account is owner",async()=>{
        const value = await instance.isOwner(accounts[0]);
        assert.equal(value,true);
    });

    it("only owner should enroll patient",async()=>{
       await instance.addClient(accounts[1],"patient",{from:accounts[0]});
    });

    it('should fail', async () => {
      await truffleAssert.reverts(instance.addClient(accounts[1],"patient", {
        from: accounts[0]}));
     });

    it("only owner should enroll hospital",async()=>{
      await instance.addClient(accounts[2],"hospital",{from:accounts[0]});
   });
   it("only owner should enroll lab",async()=>{
    await instance.addClient(accounts[3],"lab",{from:accounts[0]});
   })

   it('should fail', async () => {
    await truffleAssert.reverts(instance.addClient(accounts[4],"lab", {
      from: accounts[1]}));
   });

    it('only patient enters personal info',async()=>{
      await instance.setPersonalInfoHash('xyzaer042r',{from:accounts[1]});
    });

    it('only insti can enroll docs', async()=>{
      await instance.addEmployee(accounts[4],{from:accounts[2]});
    });

    it('only insti can enroll tech', async()=>{
      await instance.addEmployee(accounts[5],{from:accounts[3]});
    });

    it('only patient approves hospitals',async()=>{
      await instance.appprove(accounts[2],{from:accounts[1]});
    });

    it('only patient approves lab',async()=>{
      await instance.appprove(accounts[3],{from:accounts[1]});
    });

    it('only tech',async()=>{
      await instance.setMedInfoHash("xyedfaldflfa23r",accounts[1],{from:accounts[5]});
    });

    it('get info',async()=>{
      await instance.getMedInfoHash(accounts[1],{from:accounts[4]});
    });

});
