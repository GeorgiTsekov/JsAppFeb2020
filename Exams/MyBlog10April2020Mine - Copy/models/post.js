let db = firebase.firestore();

export default {
    create(data) {
        return db.collection('posts').add(data)
    },
    getAll() {
        return db.collection('posts').get()
    },
    get(id) {
        return db.collection('posts').doc(id).get()
    },
    close(id) {
        return db.collection('posts').doc(id).delete()
    },
    donate(id, data) {
        return db.collection('posts').doc(id).update(data)
    },
    update(id, data) {
        return db.collection('posts').doc(id).update(data)
    }
};