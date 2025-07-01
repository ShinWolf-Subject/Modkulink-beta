        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const network = this.closest('tr').querySelector('td').textContent;
                const dataVolume = this.closest('tr').querySelector('td:nth-child(2)').textContent;
                
                // Optional: Show confirmation before download
                if (!confirm(`Download ${network} ${dataVolume} bundle?`)) {
                    e.preventDefault();
                    return false;
                }
                
                // Optional: Track download analytics
                console.log(`Downloading: ${network} ${dataVolume}`);
            });
        });