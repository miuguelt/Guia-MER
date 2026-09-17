import os
import json
import pytest

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def test_portafolio_component_exists_and_implements_sena_standard():
    portafolio_path = os.path.join(BASE, "src", "features", "portafolio", "SenaChecklistPortafolio.tsx")
    assert os.path.isfile(portafolio_path), "El componente SenaChecklistPortafolio.tsx debe existir"

    portafolio_dir = os.path.join(BASE, "src", "features", "portafolio")
    content = ""
    for root, _, files in os.walk(portafolio_dir):
        for file in files:
            if file.endswith((".tsx", ".ts")):
                with open(os.path.join(root, file), "r", encoding="utf-8") as f:
                    content += f.read() + "\n"

    # Módulo interactivo de firma digital
    assert "handlePointerDown" in content
    assert "handlePointerMove" in content
    assert "applySignature" in content
    assert "clearCanvas" in content
    assert "handleFileUpload" in content
    assert "removeSignature" in content
    assert "signature-canvas-wrapper" in content
    assert 'id="signature-canvas"' in content

    # Cuadro formal de firmas dual (digital y físico)
    assert "signature-stamp-area" in content
    assert "signature-stamp-img" in content
    assert "signature-blank-placeholder" in content
    assert "signature-line-bar" in content
    assert "signature-digital-tag" in content
    assert "Firma del Aprendiz" in content
    assert "Firma del Instructor" in content

    # Hoja institucional SENA SIGA
    assert "sena-evidence-sheet" in content
    assert "evidence-header-table" in content
    assert "evidence-table" in content
    assert "evidence-verdict-box" in content
    assert "evidence-declaration" in content

    # Códigos de entregables reales de Guia MER
    assert "MER-EV01" in content
    assert "MER-EV02" in content
    assert "MER-EV03" in content
    assert "MER-EV04" in content
    assert "MER-EV05" in content

    # Exportadores
    assert "handlePrint" in content
    assert "handleDownloadJson" in content
    assert "handleDownloadMarkdown" in content


def test_css_implements_signature_and_print_rules():
    css_path = os.path.join(BASE, "src", "styles.css")
    with open(css_path, "r", encoding="utf-8") as f:
        css = f.read()

    assert ".sena-evidence-sheet" in css
    assert ".signature-canvas-wrapper" in css
    assert "#signature-canvas" in css
    assert ".signature-blank-placeholder" in css
    assert ".signature-stamp-img" in css
    assert ".evidence-verdict-box" in css
    assert "@media print" in css
    assert "#39a900" in css or "#39A900" in css


def test_rules_mandate_sena_checklist_and_signature_box():
    rule_path = os.path.join(
        os.path.dirname(BASE),
        "_core",
        "knowledge_base",
        "rules",
        "evidence-per-station.json",
    )
    with open(rule_path, "r", encoding="utf-8") as f:
        rule = json.load(f)

    rule_text = rule["content"]
    assert "Lista de Chequeo y Portafolio Oficial SENA con Cuadro de Firma" in rule_text
    assert "Medición reactiva de progreso real" in rule_text
    assert "Módulo interactivo y cuadro formal de firmas (dual)" in rule_text
    assert "signature-stamp-area" in rule_text
    assert "signature-blank-placeholder" in rule_text
    assert "@media print" in rule_text
