export default function Contact() {
  return (
    <div className="p-4">
      <h1 className="text-3xl text-center">Contact Us</h1>
      <p className="mt-4">Have questions? We'd love to hear from you!</p>
      <form className="mt-6">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" className="block mt-2" />
        <label htmlFor="email" className="mt-4">Email</label>
        <input type="email" id="email" className="block mt-2" />
        <button type="submit" className="mt-4">Submit</button>
      </form>
    </div>
  );
}
