<footer class="bg-dark text-white py-4">
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <h5>Luciana Araujo</h5>
                <p><i class="fas fa-phone"></i> (61) 98342-6774</p>
                <p><i class="fas fa-envelope"></i> <a href="mailto:contato@luaraujo.com">contato@luaraujo.com</a></p>
            </div>
            <div class="col-md-4">
                <h5>Links Rápidos</h5>
                <ul class="list-unstyled">
                    <li><a href="index.php">Calculadora Principal</a></li>
                    <li><a href="calc-2.php">Simulador PGBL vs CDB</a></li>
                    <li><a href="calc-3.php">Simulador de Investimentos</a></li>
                </ul>
            </div>
            <div class="col-md-4">
                <h5>Redes Sociais</h5>
                <div class="social-links">
                    <a href="https://www.linkedin.com/in/luciana-g-araujo-cea-cnpi-p-pqo-06a858b8/" class="text-white" target="_blank">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <!-- Adicionando o link do WhatsApp -->
                    <a href="https://wa.me/5561983426774" class="text-white" target="_blank">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-12 text-center">
                <p class="mb-0">© <?php echo date('Y'); ?> <a href="https://gravatar.com/lucasdorea" target="_blank">@HAKO</a>. Todos os direitos reservados.</p>
            </div>
        </div>
    </div>
    <script>
        // Smooth scroll para links do footer
        document.querySelectorAll('footer a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
</footer>