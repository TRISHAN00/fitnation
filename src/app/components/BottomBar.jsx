export default function BottomBar() {
  return (
    <section className="w-full bg-purple-900">
      <div className="max-w-[1300px] mx-auto py-8 border-t border-purple-700 flex flex-col justify-center md:flex-row md:justify-between items-center gap-4">
        <div className="flex flex-col gap-4 w-full justify-between md:flex-row text-center text-md font-semibold text-white">
          <p>Copyright ©{new Date().getFullYear()}. All Rights Reserved.</p>
          <p>
            Developed by{" "}
            <a 
              href="https://codemanbd.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-white transition-colors duration-300 underline decoration-purple-300 hover:decoration-white"
            >
              CodemanBD
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}