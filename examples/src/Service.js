export default function Service() {
  return new Promise(done => setTimeout(() => done(42), 2000));
}