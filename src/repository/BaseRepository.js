module.exports = class BaseRepository {
    constructor (Model) {     
        this.Model = Model
    }
    
    async Post(model) {
        try {
            return await model.save();
        } catch (e) {
            throw new Error(e);
        }
    }
    
    async Get() {
        try {
            return await this.Model.find();
        } catch (e) {
            throw new Error(e);
        }
    }

    async Put(id, data) {
        try {
            return await this.Model.findOneAndUpdate({ _id: id }, data, { new: true });
        } catch(e) {
            throw new Error(e);
        }
    }

    async Delete() {
        try {
            return await this.Model.findOneAndDelete({ _id: req.params.id });
        } catch(e) {
            throw new Error(e);
        }
    }

    async GetBy (obj) {
        try {
            return await this.Model.findOne(obj);
        } catch(e) {
            throw new Error(e);
        }
    }

    async Filter (obj) {
        try {
            return await this.Model.find(obj);
        } catch(e) {
            throw new Error(e);
        }
    }
}
