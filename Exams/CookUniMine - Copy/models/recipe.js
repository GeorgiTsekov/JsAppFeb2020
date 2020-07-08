let db = firebase.firestore();

export default {
    create(data) {
        return db.collection('recipes').add(data)
    },
    getAll() {
        return db.collection('recipes').get()
    },
    get(id) {
        return db.collection('recipes').doc(id).get()
    },
    close(id) {
        return db.collection('recipes').doc(id).delete()
    },
    donate(id, data) {
        return db.collection('recipes').doc(id).update(data)
    },
    update(id, data) {
        return db.collection('recipes').doc(id).update(data)
    }
};