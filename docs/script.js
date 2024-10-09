function calcular_hexa() {
    const virtual = document.getElementById('virtual').value;
    const physic = document.getElementById('physic').value;
    const pages = document.getElementById('pages').value;
    const bits = document.getElementById('bits').value;
    const printtype = document.getElementById('printtype').checked;




    // console.log(printtype);
    // get the size of the memory
    const physicSize = 2 ** (physic.length * 4);
    const virtualSize = 2 ** (virtual.length * 4);

    // Calculo de paginas para virtual
    var virtual_operations_1 = pages_operations(pages, bits, virtualSize);
    var physic_operations_1 = pages_operations(pages, bits, physicSize);

    // get page on memory
    const virtual_binary = parseInt(virtual, 16);
    const physic_binary = parseInt(physic, 16);

    const virtual_significative = get_significative_bytes(virtual_binary, bits);
    const virtual_displacement = get_displacement_bytes(virtual_binary, bits);
    const physic_significative = get_significative_bytes(physic_binary, bits);

    // console.log(virtual_binary, virtual_significative, virtual_displacement, physic_binary, physic_significative);

    
    if (printtype) {
        // print size of memory
        document.getElementById('physicSize').innerHTML = physicSize.toLocaleString() + " bytes";
        document.getElementById('virtualSize').innerHTML = virtualSize.toLocaleString() + " bytes";
        
        // print pages for virtual
        document.getElementById('num-pags-virtual').innerHTML = virtual_operations_1[0].toLocaleString() + " páginas";
        document.getElementById('des-pags-virtual').innerHTML = virtual_operations_1[1].toLocaleString() + " bytes";
        
        // print pages for physic
        document.getElementById('num-pags-physic').innerHTML = physic_operations_1[0].toLocaleString() + " páginas";
        document.getElementById('des-pags-physic').innerHTML = physic_operations_1[1].toLocaleString() + " bytes";

        //print value of displacement
        document.getElementById('page-value-forVirtual').innerHTML = "Página " + virtual_significative.toLocaleString() ;
        document.getElementById('des-value-virtual').innerHTML = "Byte " +virtual_displacement.toLocaleString();
        document.getElementById('mar-value-physic').innerHTML = "Página " +physic_significative.toLocaleString();



    } else {
        document.getElementById('physicSize').innerHTML = physicSize;
        document.getElementById('virtualSize').innerHTML = virtualSize;
        
        document.getElementById('num-pags-virtual').innerHTML = virtual_operations_1[0];
        document.getElementById('des-pags-virtual').innerHTML = virtual_operations_1[1];
        
        document.getElementById('num-pags-physic').innerHTML = physic_operations_1[0];
        document.getElementById('des-pags-physic').innerHTML = physic_operations_1[1];
    
        document.getElementById('page-value-forVirtual').innerHTML =virtual_significative;
        document.getElementById('des-value-virtual').innerHTML = virtual_displacement;
        document.getElementById('mar-value-physic').innerHTML = physic_significative;
    }
}

function pages_operations(pages, bits, memorysize) {
    
    if (!pages || pages === "") {
        if (!bits || bits === "") {
            return ["N/A", "N/A"];
        }else{
            const pagesbits = memorysize / 2 ** bits;
            //console.log(pages, bits, memorysize, pagesbits);

            return [pagesbits, 2 ** bits];
        }
    }else{
        const bits_size = (memorysize / pages);
        return [pages, bits_size];
    }
}

function calcular_binario_direccion() {
    const binary_direction = document.getElementById('binary_direcction_virtual').value;
    const bits_page = document.getElementById('bits-page').value;
    const size_page = document.getElementById('size-page').value;
    const marco_bits = document.getElementById('marco-bits').value;
    const printtype = document.getElementById('printtype1').checked;

    const table_pages = 2 ** bits_page;
    const marco_size = 2 ** marco_bits; 

    const size_virtual_memory = 2 ** binary_direction.length;
    const size_physical_memory = (2 ** marco_bits) * size_page;

    const page_reference = get_significative_bytes(parseInt(binary_direction, 2), binary_direction.length - bits_page);
    const displacement = get_displacement_bytes(parseInt(binary_direction, 2), Math.log2(size_page));

    const bits_physical = parseInt(marco_bits) + Math.log2(size_page);

    if (printtype) {
        document.getElementById('page-table').innerHTML = table_pages.toLocaleString() + " páginas";
        document.getElementById('marcs-physic').innerHTML = marco_size.toLocaleString() + " bytes";
        document.getElementById('size-virtual-memory').innerHTML = size_virtual_memory.toLocaleString() + " bytes";
        document.getElementById('size-physic-memory').innerHTML = size_physical_memory.toLocaleString() + " bytes";
        document.getElementById('num-page-reference').innerHTML = "Página " + page_reference.toLocaleString();
        document.getElementById('value-displace-virtual').innerHTML = displacement.toLocaleString() + " bytes";
        document.getElementById('bits-physic-memory').innerHTML = bits_physical.toLocaleString() + " bits";
    } else {
        document.getElementById('page-table').innerHTML = table_pages;
        document.getElementById('marcs-physic').innerHTML = marco_size;
        document.getElementById('size-virtual-memory').innerHTML = size_virtual_memory;
        document.getElementById('size-physic-memory').innerHTML = size_physical_memory;
        document.getElementById('num-page-reference').innerHTML = page_reference;
        document.getElementById('value-displace-virtual').innerHTML = displacement;
        document.getElementById('bits-physic-memory').innerHTML = bits_physical;
    }
}

function get_significative_bytes(number, desplaces) {
    return number>>desplaces;
}
function get_displacement_bytes(number, desplaces) {
    return number & (2**desplaces - 1);
}

function clean_calculator() {
    document.getElementById('binary').value = "";
    document.getElementById('decimal').value = "";
    document.getElementById('hexadecimal').value = "";
}
function get_calculator() {


    const binary = document.getElementById('binary').value;
    const decimal = document.getElementById('decimal').value;
    const hexadecimal = document.getElementById('hexadecimal').value;

    if (binary) {
        const decimalValue = parseInt(binary, 2);
        const hexaValue = decimalValue.toString(16);
        document.getElementById('decimal').value = decimalValue;
        document.getElementById('hexadecimal').value = hexaValue;
    } else if (decimal) {
        const binaryValue = decimal.toString(2);
        const hexaValue = decimal.toString(16);
        document.getElementById('binary').value = binaryValue;
        document.getElementById('hexadecimal').value = hexaValue;
    } else if (hexadecimal) {
        const decimalValue = parseInt(hexadecimal, 16);
        const binaryValue = decimalValue.toString(2);
        document.getElementById('decimal').value = decimalValue;
        document.getElementById('binary').value = binaryValue;
    }
}