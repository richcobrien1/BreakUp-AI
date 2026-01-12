"""
Breakup-AI RAG Service
FastAPI service for legal knowledge retrieval
"""

from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List
import os
from dotenv import load_dotenv

# Import RAG agent
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from rag_agent import LegalRAGAgent, DocumentType, Jurisdiction, JurisdictionLevel

load_dotenv()

app = FastAPI(
    title="Breakup-AI RAG Service",
    description="Legal knowledge retrieval and analysis API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG agent (placeholder - needs actual DB connections)
rag_agent = None  # Initialize with actual connections

# Request/Response Models
class QueryRequest(BaseModel):
    question: str = Field(..., min_length=1)
    jurisdiction: Optional[str] = Field(None, pattern="^[A-Z]{2}$")
    documentTypes: Optional[List[str]] = None
    maxResults: int = Field(5, ge=1, le=20)

class DefinitionRequest(BaseModel):
    term: str
    jurisdiction: Optional[str] = None
    plainLanguage: bool = True

class StateComparisonRequest(BaseModel):
    concept: str
    states: List[str] = Field(..., min_items=2, max_items=5)

class EvidenceRequest(BaseModel):
    claimType: str
    jurisdiction: str

class ProcedureRequest(BaseModel):
    procedureType: str
    jurisdiction: str


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "rag-service",
        "version": "1.0.0"
    }


@app.post("/query")
async def query_legal(
    request: QueryRequest,
    x_user_id: Optional[str] = Header(None)
):
    """
    Query the legal RAG system
    """
    try:
        # Mock response for now
        # TODO: Implement actual RAG query
        return {
            "query": request.question,
            "intent": {
                "type": "general_query",
                "jurisdiction": request.jurisdiction or "federal",
                "concepts": []
            },
            "results": [
                {
                    "document_id": "mock_doc_1",
                    "relevance_score": 0.95,
                    "document_type": "statute",
                    "title": "Sample Legal Reference",
                    "excerpt": "This is a mock response. Connect to actual RAG system.",
                    "plain_language": "This explains the concept in simple terms.",
                    "citation": "Mock Citation § 1234",
                    "jurisdiction": request.jurisdiction or "federal",
                    "date_effective": "2024-01-01"
                }
            ],
            "related_definitions": [],
            "cross_references": [],
            "procedural_next_steps": [
                "Review the legal reference",
                "Consult with a qualified attorney",
                "Gather necessary documentation"
            ],
            "confidence_score": 0.85,
            "sources_count": 1
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/definition/{term}")
async def get_definition(
    term: str,
    jurisdiction: Optional[str] = None,
    plainLanguage: bool = True
):
    """
    Get legal definition
    """
    try:
        # Mock response
        return {
            "term": term,
            "definition": f"Legal definition of {term}",
            "plain_language": f"Simple explanation of {term}" if plainLanguage else None,
            "jurisdiction": jurisdiction or "general",
            "source": "Mock Legal Dictionary",
            "citation": "Mock Citation",
            "related_terms": [],
            "examples": []
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/compare-states")
async def compare_states(request: StateComparisonRequest):
    """
    Compare legal concepts across states
    """
    try:
        # Mock response
        return {
            "concept": request.concept,
            "states": request.states,
            "comparisons": {
                state: {
                    "system": "mock_system",
                    "key_rules": [],
                    "statutes": [],
                    "unique_features": []
                }
                for state in request.states
            },
            "key_differences": [
                f"State comparison for {request.concept} across {', '.join(request.states)}"
            ],
            "recommendations": []
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/procedure/{procedure_type}")
async def get_procedure(
    procedure_type: str,
    jurisdiction: str
):
    """
    Get procedure guide
    """
    try:
        # Mock response
        return {
            "procedure_type": procedure_type,
            "jurisdiction": jurisdiction,
            "steps": [
                {
                    "step_number": 1,
                    "title": "Initial Filing",
                    "description": "File the required forms with the court",
                    "estimated_time": "1-2 hours"
                }
            ],
            "time_estimates": {
                "total": "varies by case"
            },
            "required_forms": [],
            "cost_estimate": None,
            "governing_statutes": []
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/evidence")
async def get_evidence_requirements(request: EvidenceRequest):
    """
    Get evidence requirements for claim type
    """
    try:
        # Mock response
        return {
            "claim_type": request.claimType,
            "jurisdiction": request.jurisdiction,
            "required_evidence": [
                {
                    "type": "financial_documents",
                    "description": "Bank statements, pay stubs, tax returns",
                    "time_period": "last 3-5 years"
                }
            ],
            "optional_evidence": [],
            "admissibility_rules": {},
            "preservation_guidelines": [
                "Keep original documents",
                "Make multiple copies",
                "Store in secure location"
            ],
            "examples": []
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8001)),
        reload=True
    )
