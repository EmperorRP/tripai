export default function Footer() {
  return (
    <footer className="p-4 border-t-4 text-gray-700 mt-auto">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex-1 mb-4 md:mb-0">
          <h3 className="font-bold text-lg">Contact</h3>
          <p>Email: business@tripai.in</p>
          <p>LinkedIn</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
        <div className="flex-1 mb-4 md:mb-0">
          <h3 className="font-bold text-lg">Legal</h3>
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
          <p>Accessibility</p>
        </div>
        <div className="flex-1 mb-4 md:mb-0">
          <h3 className="font-bold text-lg">Links</h3>
          <p>Home</p>
          <p>About</p>
          <p>Pricing</p>
          <p>My Trips</p>
          <p>Community</p>
        </div>
        <div className="flex flex-col items-center flex-1">
          <img src="logo.png" alt="Trip AI Logo" className="opacity-50 w-full h-auto" />
          <p>© TripAi.in 2024</p>
        </div>
      </div>
      <div className="m-2 border-t-2 text-sm flex justify-center items-center ">
        <p>Site made with 💚 and ⚡ by Rahul Pujari</p>
      </div>
    </footer>
  );
}
