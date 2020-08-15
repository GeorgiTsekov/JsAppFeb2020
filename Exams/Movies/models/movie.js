let db = firebase.firestore();

export default {
    create(data) {
        return db.collection('movies').add(data)
    },
    getAll() {
        return db.collection('movies').get()
    },
    get(id) {
        return db.collection('movies').doc(id).get()
    },
    close(id) {
        return db.collection('movies').doc(id).delete()
    },
    donate(id, data) {
        return db.collection('movies').doc(id).update(data)
    },
    update(id, data) {
        return db.collection('movies').doc(id).update(data)
    }
};