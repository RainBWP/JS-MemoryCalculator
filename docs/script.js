function calcular_hexa() {
    const virtual = document.getElementById('virtual').value;
    const physic = document.getElementById('physic').value;
    const pages = document.getElementById('pages').value;
    const bits = document.getElementById('bits').value;
    const printtype = document.getElementById('printtype').checked;


    console.log(printtype);

    const physicSize = 2 ** (physic.length * 4);

    const virtualSize = 2 ** (virtual.length * 4);

    // Calculo de paginas para virtual
    var virtual_operations_1 = pages_operations(pages, bits, virtualSize);
    
    var physic_operations_1 = pages_operations(pages, bits, physicSize);
    
    if (printtype) {
        document.getElementById('physicSize').innerHTML = physicSize.toLocaleString() + " bytes";
        document.getElementById('virtualSize').innerHTML = virtualSize.toLocaleString() + " bytes";
        
        document.getElementById('num-pags-virtual').innerHTML = virtual_operations_1[0].toLocaleString() + " páginas";
        document.getElementById('des-pags-virtual').innerHTML = virtual_operations_1[1].toLocaleString() + " bytes";
        
        document.getElementById('num-pags-physic').innerHTML = physic_operations_1[0].toLocaleString() + " páginas";
        document.getElementById('des-pags-physic').innerHTML = physic_operations_1[1].toLocaleString() + " bytes";

    } else {
        document.getElementById('physicSize').innerHTML = physicSize;
        document.getElementById('virtualSize').innerHTML = virtualSize;
        
        document.getElementById('num-pags-virtual').innerHTML = virtual_operations_1[0];
        document.getElementById('des-pags-virtual').innerHTML = virtual_operations_1[1];
        
        document.getElementById('num-pags-physic').innerHTML = physic_operations_1[0];
        document.getElementById('des-pags-physic').innerHTML = physic_operations_1[1];
    }
}

function pages_operations(pages, bits, memorysize) {
    
    if (!pages || pages === "") {
        if (!bits || bits === "") {
            return ["N/A", "N/A"];
        }else{
            const pagesbits = memorysize / 2 ** bits;
            console.log(pages, bits, memorysize, pagesbits);

            return [pagesbits, 2 ** bits];
        }
    }else{
        const bits_size = (memorysize / pages);
        return [pages, bits_size];
    }
}